import React from 'react'

export const LinkCard = ({ links }) => {
    return (
        <>
            <h2>Link</h2>
            <p>Your short link: <a href={links.to} target='_blank' rel="noopener noreferrer">{links.to}</a></p>
            <p>Your full link: <a href={links.from} target='_blank' rel="noopener noreferrer">{links.from}</a></p>
            <p>Clicked: <strong>{links.clicks}</strong></p>
            <p>Created: <strong>{new Date(links.date).toLocaleDateString()}</strong></p>
        </>
    )
}
