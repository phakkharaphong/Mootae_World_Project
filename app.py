from flask import Flask,render_template,request,send_file
from PIL import Image, ImageDraw, ImageFont # type: ignore
import io

#note
#int is i, string is g, decimal falot is d  



app = Flask(__name__)



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

        # Open the image
        image = Image.open(image_file)
        draw = ImageDraw.Draw(image)

        # Choose a font (ensure the font file exists)
        font_path = "arial.ttf"  # Replace with the actual path to your font file
        try:
            font = ImageFont.truetype(font_path, size=36)
        except IOError:
            font = ImageFont.load_default()

        # Add text to the image
        text_position = (50, 50)  # Adjust as needed
        draw.text(text_position, text, font=font, fill=(255, 255, 255))  # White text

        # Save the modified image to a buffer
        img_buffer = io.BytesIO()
        image.save(img_buffer, format='PNG')
        img_buffer.seek(0)

        # Return the image as a response
        return send_file(img_buffer, mimetype='image/png')
    return render_template("/manage_wallpaper/wallpaper_manage.html")

if __name__ =="__main__":
    app.run(debug=False)

