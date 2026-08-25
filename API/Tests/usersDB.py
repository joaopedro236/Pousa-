from ..Databases.Conn.users import connect_database
def selectAll():
    try:
        conn,cursor = connect_database()
        cursor.execute('select * from  usersPousae')
        users = cursor.fetchall()
        for user in users:
            print(user)
    except Exception as e:
        print(e)
selectAll()