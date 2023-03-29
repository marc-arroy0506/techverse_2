from flask import Flask
import webbrowser
from threading import Timer
from wifi import Cell , Scheme

app = Flask(__name__,static_url_path='',static_folder='static')


@app.route('/')
def static_file():
    return app.send_static_file("index.html")



@app.route('/wifi')
def wifi():
    cells = None
    # possible interfaces names
    interfaces = ["Wi-Fi"]

    for interface in interfaces:
        try:
            print("Trying interface: " + interface)
            cells = Cell.all(interface)
            break
        except:
            pass
    
    info = []
    if cells is None:
        return info
    
    for cell in cells:
        cell_info = {}
        cell_info["ssid"] = cell.ssid
        cell_info["address"] = cell.address
        cell_info["signal"] = cell.signal
        cell_info["encrypted"] = cell.encrypted
        cell_info["channel"] = cell.channel
        cell_info["mode"] = cell.mode
        cell_info["frequency"] = cell.frequency
        cell_info["bitrates"] = cell.bitrates
        cell_info["quality"] = cell.quality    
        info.append(cell_info)
    
    return info

def open_browser():
    webbrowser.open('http://127.0.0.1:5000')

# launch the page in the browser after 1 second
# it is necessary to wait for the server to start
# if you call after the server has started, it will not work
# as app.run() is blocking
# so we wait for 1 second and then open the browser
Timer(1, open_browser).start()

# start the web server
app.run(debug=True,port="5000")
