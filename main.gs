const CHANNEL_ACCESS_TOKEN = "";
const spreadsheet = SpreadsheetApp.openById('');
const url = 'https://api.line.me/v2/bot/message/broadcast';
const url2 = '';
const requestUrl = '';
const categories = ["講義", "試験", "レポート", "一般", "就職"];
const colors = ['#008080', '#cd5c5c', '#6b8e23', '#ff8c00', '#4169e1'];

const sheet = spreadsheet.getActiveSheet();

function doPost(e) {
    const response = UrlFetchApp.fetch(requestUrl);
    // XMLをパース
    const xml = XmlService.parse(response.getContentText());

    // 各データの要素を取得
    const entries = xml.getRootElement().getChildren("channel")[0].getChildren("item");

    const message = [];
    let start;
    
    //num_arrayに通知済みの番号を入れる
    let num_array = [];
    for(let i = 3; i < 200; i++ ){
       if(sheet.getRange("B" + String(i)).getValue() != ""){
           num_array.push(sheet.getRange("B" + String(i)).getValue());
           Logger.log(sheet.getRange("B" + String(i)).getValue());
       }else{
           //次に記事番号を書き込む行を保持
           start = i;
           break;
       }
    }
    
for(let i = 19; i >=0; i--){
        let link = entries[i].getChildText("link");
        let art_num = entries[i].getChildText("link").replace(url2 + '/ja/detail.php?id=', '').replace('&c=3', '');
        let category_num = entries[i].getChildText("description").charAt(0);
        let title = entries[i].getChildText("title");
        
        //通知済みでない記事の場合は通知
        if (!num_array.includes(art_num)) {
        sheet.getRange("B" + String(start)).setValue(art_num);
        sheet.getRange("C" + String(start)).setValue(title);
        start += 1;
          Logger.log(art_num);
            message.push({
                'type': 'flex',
                'altText': title,
                'contents': {
                    "type": "bubble",
                    "size": "mega",
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "text",
                                        "text": categories[category_num - 1],
                                        "color": "#ffffff",
                                        "size": "15px"
                                    }
                                ],
                                "backgroundColor": colors[category_num - 1],
                                "width": "50px",
                                "cornerRadius": "5px",
                                "justifyContent": "center",
                                "alignItems": "center",
                                "height": "25px"
                            },
                            {
                                "type": "text",
                                "weight": "bold",
                                "size": "md",
                                "wrap": true,
                                "text": title,
                                "margin": "7px"
                            },
                            {
                                "type": "button",
                                "action": {
                                    "type": "uri",
                                    "label": "掲示板を開く",
                                    "uri": link
                                },
                                "height": "sm",
                                "margin": "20px",
                                "color": colors[category_num - 1],
                                "style": "primary"
                            }
                        ]
                    }
                }
            })
        }
}

   
 
 if(message.length != 0){
     try {
        UrlFetchApp.fetch(url, {
            'headers': {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
            },
            'method': 'post',
            'payload': JSON.stringify({
                'messages': message,
            }),
        });
    } catch (e) {
    /*
        UrlFetchApp.fetch(url, {
            'headers': {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
            },
            'method': 'post',
            'payload': JSON.stringify({
                'messages': [{
                    'type': 'text',
                    'text': e.message
                }],
            }),
        });
        */
    }
   
 }
}




function postSpecificArticle() {
    var response = UrlFetchApp.fetch(requestUrl);
    // XMLをパース
    var xml = XmlService.parse(response.getContentText());

    // 各データの要素を取得
    var entries = xml.getRootElement().getChildren("channel")[0].getChildren("item");
    
    var message = [];

    for (let i = 10; i >= 0; i--) {
        let link = entries[i].getChildText("link");
        let art_num = Number(entries[i].getChildText("link").replace(url2 + '/ja/detail.php?id=', '').replace('&c=3', ''));
        let category_num = entries[i].getChildText("description").charAt(0);
        let title = entries[i].getChildText("title");

        if (art_num == 5304) {
            message.push({
                'type': 'flex',
                'altText': title,
                'contents': {
                    "type": "bubble",
                    "size": "mega",
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "text",
                                        "text": categories[category_num - 1],
                                        "color": "#ffffff",
                                        "size": "15px"
                                    }
                                ],
                                "backgroundColor": colors[category_num - 1],
                                "width": "50px",
                                "cornerRadius": "5px",
                                "justifyContent": "center",
                                "alignItems": "center",
                                "height": "25px"
                            },
                            {
                                "type": "text",
                                "weight": "bold",
                                "size": "md",
                                "wrap": true,
                                "text": title,
                                "margin": "7px"
                            },
                            {
                                "type": "button",
                                "action": {
                                    "type": "uri",
                                    "label": "掲示板を開く",
                                    "uri": link
                                },
                                "height": "sm",
                                "margin": "20px",
                                "color": colors[category_num - 1],
                                "style": "primary"
                            }
                        ]
                    }
                }
            })
        }


    }

    if (message.length != 0) {
        try {
            UrlFetchApp.fetch(url, {
                'headers': {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
                },
                'method': 'post',
                'payload': JSON.stringify({
                    'messages': message,
                }),
            });
        } catch (e) {
           /* UrlFetchApp.fetch(url, {
                'headers': {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
                },
                'method': 'post',
                'payload': JSON.stringify({
                    'messages': [{
                        'type': 'text',
                        'text': e.message
                    }],
                }),
            });
            */
        }

    }
}