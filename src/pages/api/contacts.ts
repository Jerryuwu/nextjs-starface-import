// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { sha512 } from 'js-sha512'
import { Attribute, Contact } from '@/types/contact'

let token = ''

type RequestBody = {
  loginID: string
  password: string
  contacts: Contact[]
}

type GetLoginResponse = {
  loginType: 'Internal' | 'ActiveDirectory'
  nonce: string
  secret: string | null
}
type AuthTokenResponse = {
  token: string
}

async function getAuthToken(
  body: GetLoginResponse
): Promise<AuthTokenResponse> {
  const req = await fetch('http://10.13.37.101/rest/login', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'X-Version': '2',
    },
  })
  const json = await req.json()
  return json
}

async function starfaceFetch(
  link: string,
  method: string,
  body: string
): Promise<Response> {
  return fetch(link, {
    method,
    body,
    headers: {
      'Content-Type': 'application/json',
      'X-Version': '2',
      authToken: token,
    },
  })
}

async function initLogin(): Promise<GetLoginResponse> {
  const req = await fetch('http://10.13.37.101/rest/login')
  return req.json()
}

function getSecret(nonce: string, loginID: string, password: string): string {
  return loginID + ':' + sha512(loginID + nonce + sha512(password))
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != 'POST') {
    res.status(405).end('Method not allowed!')
    return
  }
  const loginResponse = await initLogin()
  const body: RequestBody = req.body
  loginResponse.secret = getSecret(
    loginResponse.nonce,
    body.loginID,
    body.password
  )
  const authToken = await getAuthToken(loginResponse)
  token = authToken.token

  body.contacts.forEach(async (contact) => {
    let resp = await starfaceFetch(
      'http://10.13.37.101/rest/contacts',
      'POST',
      JSON.stringify(contact)
    )
    console.log('Test')
    let respjson = await resp.text()
    console.log(respjson)
    console.log('Test2')
  })
  res.status(200)
}
