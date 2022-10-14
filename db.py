import psycopg2

def connect():
    """Connect to the PostgreSQL database server"""
    conn = None
    try:
        conn = psycopg2.connect("dbname=quotes user=postgres password=x")
        print("Successfully connected to db")
        # create a cursor
        cur = conn.cursor()
        
        cur.execute("SELECT * from quote_data WHERE author='Dr. Seuss'")
        query_results = cur.fetchall()
        for x in query_results:
            print(x)
       


	    # close the communication with the PostgreSQL
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed.')


if __name__ == '__main__':
    connect()
