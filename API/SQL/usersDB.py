from API.Databases.Conn.users import connect_database
import pprint
def selectAll():
    try:
        conn,cursor = connect_database()
        cursor.execute('select * from  usersPousae')
        users = cursor.fetchall()
        for user in users:
            pprint.pprint(user)
    except Exception as e:
        print(e)
selectAll() 