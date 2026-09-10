from API.Databases.Conn.users import connect_database
import pprint
def selectAll():
    try:
        conn,cursor = connect_database()
        cursor.execute('select star from  usersPousae')
       
        rows = cursor.fetchall()


        pprint.pprint(rows)
    except Exception as e:
        print(e)
selectAll() 