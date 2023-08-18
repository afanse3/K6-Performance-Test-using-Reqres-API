import { sleep, check, group } from 'k6'
import http from 'k6/http'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export const options = {
  thresholds: {},
  scenarios: {
    //Stress Test Scenario
    Scenario_3: {
        executor: 'constant-vus',
        vus: 20,
        duration: '5m',
        gracefulStop: '2m',
        exec: 'scenario_3',
        }
  },
}

export function scenario_3() {
  let response

  group('User List Case', function () {
    // LIST USERS
    response = http.get('https://reqres.in/api/users?page=2')
    check(response, { 'status equals 200': response => response.status.toString() === '200' })

    // SINGLE USER
    response = http.get('https://reqres.in/api/users/2')
    check(response, { 'status equals 200': response => response.status.toString() === '200' })

    // SINGLE USER NOT FOUND
    response = http.get('https://reqres.in/api/users/23')
    check(response, { 'status equals 404': response => response.status.toString() === '404' })
  })

  group('Resource List', function () {
    // List Resource
    response = http.get('https://reqres.in/api/unknown')
    check(response, { 'status equals 200': response => response.status.toString() === '200' })

    // Single Resource
    response = http.get('https://reqres.in/api/unknown/2')
    check(response, { 'status equals 200': response => response.status.toString() === '200' })

    // Single Resource not found
    response = http.get('https://reqres.in/api/unknown/23')
    check(response, { 'status equals 404': response => response.status.toString() === '404' })
  })

  group('User Case', function () {
    // CREATE USER
    response = http.post('https://reqres.in/api/users', '{"name":"morpheus","job":"leader"}', {
      headers: {
        'content-type': 'application/json',
      },
    })
    check(response, { 'status equals 201': response => response.status.toString() === '201' })

    // UPDATE USER
    response = http.put('https://reqres.in/api/users/2', '{"name":"morpheus","job":"pedagang"}', {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // UPDATE USER
    response = http.patch(
      'https://reqres.in/api/users/2',
      '{"name":"morpheus","job":"software trainee"}',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    check(response, { 'status equals 200': response => response.status.toString() === '200' })

    // DELETE USER
    response = http.del('https://reqres.in/api/users/2')
    check(response, { 'status equals 204': response => response.status.toString() === '204' })
  })

  group('Register Case', function () {
    // Register - Successful
    response = http.post(
      'https://reqres.in/api/register',
      '{"email":"eve.holt@reqres.in","password":"pistol"}',
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    )
    check(response, { 'status equals 200': response => response.status.toString() === '200' })

    // Register - Unsuccessful
    response = http.post('https://reqres.in/api/register', '{"email":"alksjdlasjda@gmail.com"}', {
      headers: {
        'content-type': 'application/json',
      },
    })
    check(response, { 'status equals 400': response => response.status.toString() === '400' })
  })

  group('Login Case', function () {
    // Login - Successful
    response = http.post(
        'https://reqres.in/api/login',
        '{"email":"eve.holt@reqres.in","password":"cityslicka"}',
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      )
      check(response, { 'status equals 200': response => response.status.toString() === '200' })
    // Login - Unsuccessful
    response = http.post('https://reqres.in/api/login', '{"email":"adsklfhasdlkfh@gmail.com"}', {
      headers: {
        'content-type': 'application/json',
      },
    })
    check(response, { 'status equals 400': response => response.status.toString() === '400' })
  })

  // Automatically added sleep
  sleep(1)
}

export function handleSummary(data) {
    return {
      "stress-test-script-result.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
  }