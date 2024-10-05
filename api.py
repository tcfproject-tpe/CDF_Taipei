from flask import Flask, jsonify, request
import mysql.connector
from mysql.connector import Error
from flask_cors import CORS
import pandas as pd
import json
import yagmail

app = Flask(__name__)
CORS(app)

# 設置 MySQL 連接
def get_db_connection():
    return mysql.connector.connect(
        host='db',
        port=5001,
        user='root',
        password='xxxx',
        database='TCFData',
        charset='utf8mb4'
    )


# 獲取資料
def fetch_data_from_db(ball=None, pay=1, district=None):
    print(ball, pay)
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)  # 使用 dictionary=True 使得結果為字典形式
    query = "SELECT * FROM court_info"
    conditions = []
    parameters = []
    if ball == 'basketball':
        conditions.append("category LIKE '%籃球%'")
    if ball == 'volleyball':
        conditions.append("category LIKE '%排球%'")
    if ball == 'tabletennis':
        conditions.append("category LIKE '%桌球%'")
    if ball == 'badminton':
        conditions.append("category LIKE '%羽球%'")

    
    if pay == 1:
        conditions.append("availability_status LIKE '%付費%'")
    
    elif pay == 0:
        conditions.append("availability_status LIKE  '%免費%'")

    if district is not None:
        conditions.append("district = %s")
        parameters.append(district)
    
    if conditions:
        query += " WHERE " + " AND ".join(conditions)
        print(query)

    print("Executing query:", query)
    print("With parameters:", parameters)

    # 執行 SQL 查詢
    cursor.execute(query, parameters)
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

def fetch_data_from_db1(id=None):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)  # 使用 dictionary=True 使得結果為字典形式

    query1 = "SELECT * FROM court_info"
    if id != None:
        query1 += " WHERE " + " id= " + id
        print(query1)

    print("Executing query:", query1)


    # 執行 SQL 查询

    cursor.execute(query1)
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

@app.route('/api/courts', methods=['GET'])
def get_court_data():
    try:
        # 從查詢參數中提取數據
        ball = request.args.get('ball')
        pay = request.args.get('pay', default=1, type=int)
        district = request.args.get('district')

        # 調用獲取數據的函數，傳入查詢參數
        data = fetch_data_from_db(ball=ball, pay=pay, district=district)
    
        # 創建響應對象
        response = jsonify(data)
        response.content_type = 'application/json; charset=utf-8'
        return response, 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500  #  返回錯誤信息及 HTTP 狀態碼 500


@app.route('/api/court_one', methods=['GET'])
def get_court_data1():
    try:
        # 從查詢參數中提取數據
        id = request.args.get('id')
        # 調用獲取數據的函數，傳入查詢參數
        data = fetch_data_from_db1(id=id)
        
        # 創建響應對象
        response = jsonify(data[0])
        response.content_type = 'application/json; charset=utf-8'
        return response, 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500   #  返回錯誤信息及 HTTP 狀態碼 500


def generate_email_body(name, reservation_details, date_time):
    html_template = f'''
    <!DOCTYPE html>
    <html lang="zh-Hant">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>預約成功通知</title>
        <style>
            body {{
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
            }}
            .email-container {{
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }}
            h1 {{
                color: #333333;
            }}
            p {{
                color: #555555;
            }}
            .footer {{
                margin-top: 20px;
                color: #888888;
                font-size: 12px;
            }}
        </style>
    </head>
    <body>
        <div class="email-container">
            <h1>尊敬的 {name} 您好，</h1>
            <p>感謝您選擇我們的場館服務，並恭喜您成功預約了 <strong>{reservation_details}</strong></p>
            <p>請於以下預約時間：<strong>{date_time}</strong> 報到</p>
            <p>台北通 敬上</p>

            <div class="footer">
                <p>此郵件為系統自動發送，請勿回覆。如需協助，請聯繫我們的客服團隊。</p>
            </div>
        </div>
    </body>
    </html>
    '''
    return html_template



def mail_action(sender_email, password, receiver_email, email_body):

    # 創建yagmail 客戶端
    yag = yagmail.SMTP(sender_email, password)
    print(1)
    # 發送郵件
    try:
        yag.send(
            to=receiver_email,
            subject='成功預約通知',
            contents=email_body
        )
        print('sent the mail successful')
    except Exception as e:
        print(f'sent the mail fail: {e}')

@app.route('/api/sent_mail', methods=['POST'])
def sent_mail():
    try:
        data = request.json
        print(data)
        name = data.get('name')
        print(name)
        reservation_details = data.get('reservation_details')
        print(reservation_details)
        date_time = data.get('date_time')
        print(date_time)
        email_body = generate_email_body(name, reservation_details, date_time)
        print(email_body)
        sender_email = 'aaaaaaaaaaaaaaaaa@gmail.com'
        receiver_email = 'xxxxxxxxxxxxxx@gmail.com'
        password = 'xxxxxxxxxxxxxxxxxxxxxxxxx'

        if mail_action(sender_email, password, receiver_email, email_body):
            response = jsonify({"status": "success"})
            response.content_type = 'application/json; charset=utf-8'
            return response, 200
        else:
            print(1)
            response = jsonify({"status": "error", "message": "郵件發送失败"})
            response.content_type = 'application/json; charset=utf-8'
            return response, 500

    except Exception as e:
        # 處理例外
        response = jsonify({"status": "success", "message": str(e)})
        response.content_type = 'application/json; charset=utf-8'
        return response, 200


# 設置主入口
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
