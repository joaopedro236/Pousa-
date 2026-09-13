from API.Databases.Conn.trips import connect_database_trip
def selectAll():
    try:
        conn,cursor = connect_database_trip()
        cursor.execute('''UPDATE trips
SET
    comments = comments || ARRAY['Viagem muito boa!', 'Lugar incrível!'],
    note = note || ARRAY[5, 4],
    usersComments = usersComments || ARRAY[
        'd74aaa9e-ba52-4dd7-a738-a3b8854bf58b'::uuid,
        'd74aaa9e-ba52-4dd7-a738-a3b8854bf58b'::uuid
    ]
WHERE id = 7;''')
        conn.commit()
    except Exception as e:
        print(e)
selectAll()     