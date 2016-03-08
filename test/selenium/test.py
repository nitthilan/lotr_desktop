import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
chrome_options = Options()
chrome_options.add_argument("nwapp=/Users/nitthilan/Documents/myfolder/project_devan/automation/lotr/desktop/build/nwjs.app")
#/Contents/MacOS/nwjs
driver = webdriver.Chrome(executable_path='/Users/nitthilan/Documents/myfolder/project_devan/automation/lotr/desktop/build/chromedriver', chrome_options=chrome_options)

driver.get('http://www.google.com/xhtml');
time.sleep(5) # Let the user actually see something!
search_box = driver.find_element_by_name('q')
search_box.send_keys('ChromeDriver')
search_box.submit()
time.sleep(5) # Let the user actually see something!
driver.quit()