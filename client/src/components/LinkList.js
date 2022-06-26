import React from 'react'
import { Link } from 'react-router-dom'

export const LinkList = ({ links }) => {
    if (!links.length) {
        return <p>No links found</p>

    }
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>Original</th>
                        <th>Shortened</th>
                    </tr>
                </thead>

                <tbody>
                    {links.map((link, index) => {
                        return (
                            <tr key={link._id}>
                                <td>{index + 1}</td>
                                <td>{link.from}</td>
                                <td>{link.to}</td>
                                <td>
                                    <Link to={`/details/${link._id}`}>Open</Link>
                                </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>
        </div>
    )
}
