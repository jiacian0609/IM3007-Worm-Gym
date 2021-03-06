# Generated by Selenium IDE
import pytest
import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

class TestRecord():
  def setup_method(self, method):
    self.driver = webdriver.Chrome()
    self.vars = {}
  
  def teardown_method(self, method):
    self.driver.quit()
  
  def test_record(self):
    # Test name: record
    # Step # | name | target | value
    # 1 | open | / | 
    self.driver.get("http://localhost:3000")
    self.driver.execute_script("document.body.style.zoom = '50%'")
    # 2 | setWindowSize | 1440x900 | 
    # self.driver.set_window_size(1440, 900)
    self.driver.maximize_window()
    # 3 | click | id=username | 
    el = self.driver.find_element_by_id("username")
    self.driver.execute_script("arguments[0].click();", el)
    # 4 | type | id=username | userONE
    self.driver.find_element(By.ID, "username").send_keys("userONE")
    # 5 | click | id=password | 
    el = self.driver.find_element_by_id("password")
    self.driver.execute_script("arguments[0].click();", el)
    # 6 | type | id=password | 11111111
    self.driver.find_element(By.ID, "password").send_keys("11111111")
    # 7 | click | css=.sc-iBkjds | 
    el = self.driver.find_element_by_css_selector(".sc-iBkjds")
    self.driver.execute_script("arguments[0].click();", el)
    # 8 | click | css=a:nth-child(2) > .sc-iqcoie | 
    time.sleep(0.5)
    self.driver.execute_script("document.body.style.zoom = '50%'")
    time.sleep(2)
    el = self.driver.find_element_by_css_selector("a:nth-child(2) > .sc-iqcoie")
    self.driver.execute_script("arguments[0].click();", el)
    # 9 | click | css=.jsBA-dY | 
    time.sleep(0.5)
    self.driver.execute_script("document.body.style.zoom = '50%'")
    time.sleep(1)
    el = self.driver.find_element_by_css_selector(".jsBA-dY")
    self.driver.execute_script("arguments[0].click();", el)
    # 10 | click | css=.form__field:nth-child(1) > .form__field-input | 
    time.sleep(1)
    el = self.driver.find_element_by_css_selector(".form__field:nth-child(1) > .form__field-input")
    self.driver.execute_script("arguments[0].click();", el)
    # 11 | type | css=.form__field:nth-child(1) > .form__field-input | X
    self.driver.find_element(By.CSS_SELECTOR, ".form__field:nth-child(1) > .form__field-input").send_keys("X")
    # 12 | click | css=.form__field:nth-child(2) > .form__field-input | 
    time.sleep(1)
    el = self.driver.find_element_by_css_selector(".form__field:nth-child(2) > .form__field-input")
    self.driver.execute_script("arguments[0].click();", el)
    # 13 | type | css=.form__field:nth-child(2) > .form__field-input | 1 ???
    self.driver.find_element(By.CSS_SELECTOR, ".form__field:nth-child(2) > .form__field-input").send_keys("1 ???")
    # 14 | click | css=.form__field:nth-child(3) > .form__field-input | 
    time.sleep(1)
    el = self.driver.find_element_by_css_selector(".form__field:nth-child(3) > .form__field-input")
    self.driver.execute_script("arguments[0].click();", el)
    # 15 | type | css=.form__field:nth-child(3) > .form__field-input | 20 ??????
    self.driver.find_element(By.CSS_SELECTOR, ".form__field:nth-child(3) > .form__field-input").send_keys("20 ??????")
    # 16 | click | css=.sc-iNWwEs | 
    time.sleep(1)
    el = self.driver.find_element_by_css_selector(".sc-iNWwEs")
    self.driver.execute_script("arguments[0].click();", el)
    # 17 | click | css=.fsuyVA | 
    time.sleep(0.5)
    self.driver.execute_script("document.body.style.zoom = '50%'")
    time.sleep(2)
    el = self.driver.find_element_by_css_selector(".fsuyVA")
    self.driver.execute_script("arguments[0].click();", el)
    
  
actor = TestRecord()
actor.setup_method("foo")
actor.test_record()