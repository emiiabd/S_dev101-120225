const POSTReCaptcha = async (url) => {
  try {
    const response = await fetch(url, { method: 'POST' })

    if (response.ok) {
      return await response.json()
    }else {
      throw { detail: 'CAPTCHA POST ERROR' }
    }
  }
  catch (error) {
    throw error
  }
}

export default POSTReCaptcha