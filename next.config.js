/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: ['insanelygoodrecipes.com']
    }
}

module.exports = nextConfig
