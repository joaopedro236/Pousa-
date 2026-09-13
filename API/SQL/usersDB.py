from API.Databases.Conn.users import connect_database
import pprint
def selectAll():
    try:
        conn,cursor = connect_database()
        cursor.execute('''SELECT name, image_url, session_token
FROM usersPousae
WHERE session_token = 'd74aaa9e-ba52-4dd7-a738-a3b8854bf58b';''')
       
        rows = cursor.fetchall()


        pprint.pprint(rows)
    except Exception as e:
        print(e)
selectAll() 