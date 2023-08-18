# K6 Performance Test using Reqres API
 Learning K6 Perfomance Test using Reqres API
What performance test im trying is:
1. Load Test
2. Endurance Test
3. Stress Test
4. Peak Test
5. Spike Test

How to run:
1. Clone this repo
```
https://github.com/afanse3/K6-Performance-Test-using-Reqres-API.git
```
2. If you have Grafana K6 account, you can just copy one of the test to dashboard and add the server you want. If you don't, then you need to install chocolatey in your computer.
```
https://chocolatey.org/install#individual
```
3. Then install K6 using this command in your powershell:
```
choco install k6
```
4. After that you can run the scipt using cmd
Example running load test:
```
k6 run load-test-script.js
```
5. After the test complete, you should see there's new file created "load-test-script-result.html", open it with browser and you can see the report of the test you execute.

#DISCLAIMER#
You can change almost everything if you have paid account, but for free account there's a limit of VU you can use (max. 10) and duration is only 5 mins.
I don't add a CPU limit usage in this script, so I suggest you have at least 4 cores in your CPU or higher. Any other than that do it at your own risk.
