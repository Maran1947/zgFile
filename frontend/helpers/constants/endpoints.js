export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const endpoints = {
    SIGNUP: '/auth/signup',
    SIGNIN: '/auth/signin',
    LOGOUT: '/auth/logout',
    UPLOAD_FILE: '/file/upload',
    GET_FILE_BY_ID: '/file',
    GET_FILES_BY_USERID: '/file/all',
    SHARE: '/share',
    CREATE_SHARE: '/share/create',
    GET_ALL_SHARE_BY_USERID: '/share/all',
    GET_PUBLISH_SHARE: '/share/publish',
    DOWNLOAD_FILES: '/share/download'
}
