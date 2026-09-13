from fastapi import APIRouter
from ...Databases.Conn.trips import connect_database_trip
from ...Databases.Conn.users import connect_database
from ...Validation.Comments.get_comments import getComments
router = APIRouter()
@router.post('/getComment')
def getComment(data: getComments):
    conn = None
    connUser=None
    cursorUser=None
    cursor= None
    try:
        conn ,cursor = connect_database_trip()
        connUser, cursorUser = connect_database()
        cursor.execute("select comments,usersComments,note from trips where id =%s", (data.id, ))
        trip = cursor.fetchone()
        if not trip:
            return {'Status': False, 'Error': 'Trip not found'}
        comments = trip[0] or []
        usersComments = trip[1] or []
        note = trip[2] or []
        usersComments = usersComments if isinstance(usersComments, list) else usersComments.strip('{}').split(',')
      

        cursorUser.execute(
            """
            SELECT name, image_url, session_token
            FROM usersPousae
            WHERE session_token::text = ANY(%s)
            """,
            (usersComments,)
        )

        users = cursorUser.fetchall()

        users_dict = {
            str(user[2]): {
                'name': user[0],
                'image_url': user[1]
            }
            for user in users
        }
        result = []


        for comment, userToken, commentNote in zip(comments, usersComments, note):
            user = users_dict.get(str(userToken))

            result.append({
                'comment': comment,
                'note': commentNote,
                'name': user['name'] if user else None,
                'image_url': user['image_url'] if user else None
            })
        return {
            'Status': True,
            'Comments': result
        }
    except Exception as e:
        return{'Status': False, 'Error': str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        if cursorUser:
            cursorUser.close()
        if connUser:
            connUser.close()