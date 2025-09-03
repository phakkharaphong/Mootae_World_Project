import json
from flask import Flask, jsonify,render_template,request,send_file
from PIL import Image, ImageDraw, ImageFont # type: ignore
import io
from model.user import db_user
from flasgger import Swagger
#note
#int is i, string is g, decimal falot is d  


app = Flask(__name__)

Swagger(app)
#read config sql file by json
with open('model/user/confic_user.json','r') as file:
    confic = json.load(file)
db_table = confic['postgres'].get("db_table")

UPLOAD_FOLDER = 'D:\Mootae_World_Project\static\img'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

@app.route("/")
def homepage():
    return render_template("homepage.html")

@app.route("/about")
def aboutpage():
    return render_template("about.html")

@app.route("/wallpaper", methods=['GET', 'POST'])
def wallpaper():
    if request.method == 'POST':
        text = request.form['text']
        image_file = request.files['image']
        position_x = request.form['position_x']
        position_y = request.form["position_y"]
        position_x = int(position_x)
        position_y = int(position_y)
        # Open the image
        image = Image.open(image_file)
        draw = ImageDraw.Draw(image)

        # Choose a font (ensure the font file exists)
        font_path = "arial.ttf"  # Replace with the actual path to your font file
        try:
            font = ImageFont.truetype(font_path, size=70)
        except IOError:
            font = ImageFont.load_default()

        # Add text to the image
        text_position = (position_x, position_y)  # Adjust as needed
        draw.text(text_position, text, font=font, fill=(255, 255, 255))  # White text

        # Save the modified image to a buffer
        img_buffer = io.BytesIO()
        image.save(img_buffer, format='PNG')
        img_buffer.seek(0)
        # Return the image as a response
        return send_file(img_buffer, mimetype='image/png')
    return render_template("/manage_wallpaper/wallpaper_manage.html")


@app.route("/form-wallpaper-brith-date", methods=['GET', 'POST'])
def pform_wallpaper_brith_date():

    #check method
    if request.method == 'POST':
        if request.form == None:
            print("EER")
        else:
            #accept requset from form to text
            text = request.form['select-day-form-dateofbirth']
            date = request.form['converday']
            month = request.form['convermonth']
            year = request.form['year']
            i_dayofnumber = g_case_of_day(date)
            i__monthofnumber = g_case_of_month(month)
            print("Text is ",text,"day is ",date,"month is ",month,"yearName is ",year ,"Day Of Number",
                  i_dayofnumber, "Month of Number ",i__monthofnumber)

    return render_template("manage_wallpaper/wallpaper_manage_brithdate.html")


#Test Connect api sql in posgress 
@app.route("/read",methods = ['GET'])
def read():
    query = f'SELECT * FROM public.user;'
    try:
        result = db_user.read_from_db(query)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error':str(e)}),500
    
@app.route("/menu_layout")
def layout_menu():
    return render_template("/component_menu/layout_menu.html")

#------------------ Funtion Method -------------------
def g_case_of_day(_day):
    switch={
        'วันอาทิตย์': 1,
        'วันจันทร์': 2,
        'วันอังคาร': 3,
        'วันพุธ': 4,
        'วันพฤหัสบดี': 5,
        'วันศุกร์': 6,
        'วันเสาร์': 7
    } 
    return switch.get(_day,"not")

def g_case_of_month(_month):
    switch={
        'มกราคม': 3,
        'กุมภาพันธ์': 4,
        'มีนาคม': 5,
        'เมษายน': 6,
        'พฤษภาคม': 7,
        'มิถุนายน': 1,
        'กรกฏาคม': 2,
        'สิงหาคม': 3,
        'กันยายน': 4,
        'ตุลาคม': 5,
        'พฤศจิกายน':1,
        'ธันวาคม': 2

    } 
    return switch.get(_month,"not")


#---------------------- End ----------------------

if __name__ =="__main__":
    app.run(debug=True, port=5001)

