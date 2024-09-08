All Project are here  link : https://drive.google.com/drive/folders/1HSbg-nbDr2UD5L_2EeDeGUAPNjs-Qa5o?usp=sharing


【API format】
球場資訊
URL: /api/courts
方法: get
描述: 所有球場的資訊(列表用）。
請求標頭: 無需認證。
請求參數
參數	類型	必填	描述
category	string		volleyball (排球), baseketball 籃球,badminton羽球,tabletennis 桌球
pay	Interger		0:免費 , 1:收費
district	string		行政區


------------------------------------------

單一球場資訊
URL: /api/court_one
方法: get
描述: 單一球場的資訊(內頁用）。
請求標頭: 無需認證。
請求參數
參數	類型	必填	描述
court_id	int		
------------------------------------------

球場預約狀態
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



------------------------------------------


------------------------------------------

--



