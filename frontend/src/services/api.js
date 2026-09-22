const API_URL = '/api'

async function getCsrfToken() {
    await fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
        credentials: 'include',
    })

    const xsrfCookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('XSRF-TOKEN='))

    return xsrfCookie
        ? decodeURIComponent(xsrfCookie.split('=')[1])
        : ''
}

async function request(endpoint, options = {}) {
    const method = options.method || 'GET'

    const headers = {
        Accept: 'application/json',
        ...(options.headers || {}),
    }

    if (method !== 'GET') {
        headers['Content-Type'] = 'application/json'
        headers['X-XSRF-TOKEN'] = await getCsrfToken()
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        credentials: 'include',
        headers,
    })

    const data = await response.json().catch(() => null)

    return {
        response,
        data,
    }
}

export const api = {
    get(endpoint) {
        return request(endpoint)
    },

    post(endpoint, body) {
        return request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
        })
    },

    put(endpoint, body) {
        return request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body),
        })
    },

    delete(endpoint) {
        return request(endpoint, {
            method: 'DELETE',
        })
    },
}