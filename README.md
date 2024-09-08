All Project are here  
link: https://drive.google.com/drive/folders/1HSbg-nbDr2UD5L_2EeDeGUAPNjs-Qa5o?usp=sharing

Data source: https://data.gov.tw/dataset/22849

***【API format】***

**1.球場資訊**
URL: /api/courts
方法: get
描述: 所有球場的資訊(列表用）。
請求標頭: 無需認證。
請求參數
參數	類型	必填	描述
category	string		volleyball (排球), baseketball 籃球,badminton羽球,tabletennis 桌球
pay	Interger		0:免費 , 1:收費
district	string		行政區**

**2.單一球場資訊**
URL: /api/court_one
方法: get
描述: 單一球場的資訊(內頁用）。
請求標頭: 無需認證。
請求參數
參數	類型	必填	描述
court_id	int		

**3.球場預約狀態**
URL: /courts_status
方法: get
描述: 所有球場的預約狀態。
請求標頭: 無需認證。
請求參數
參數	類型	必填	描述
category	string		球類 volleyball 排球, baseketball籃球,badminton羽球,tabletennis 桌球
pay	Interger		0:免費 , 1:收費（預設 1）
district	string		行政區 預設給 (全部)
isBook	bool		可以預約
date	string		日期
period	string		時間

**4.揪團預約**
URL: /book_court
方法: POST
描述: 預約球場
請求標頭: 無需認證。
請求參數:
參數	類型	必填	描述
id_type	String	是	使用者名稱
court_id	String	是	球場id
date	String	是	日期
time	String	是	時段**

**5.發送預約信件**
URL: /send_book_mail
方法: post
描述: 寄送成功預約訊息
請求標頭: 無需認證。
請求:
json
{
  "user_name": "黃台北",
  "court_name": "內湖運動中心",
  "datetime": "2024-09-08 10:00:00"
}




