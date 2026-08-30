from API.Databases.Conn.trips import connect_database_trip
def selectAll():
    try:
        conn,cursor = connect_database_trip()
        cursor.execute('select * from  trips')
        users = cursor.fetchall()
        for user in users:
            print(user)
    except Exception as e:
        print(e)
selectAll() 