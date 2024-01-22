import React from 'react'

export const ProductCard = ({ user }) => {

    // const { user } = props;
    
    return (
        <div className="card" >
                <small>{user._id}</small>
                <h2>{user.name}</h2>
                <p>{user.age}</p>
                <p>{user.email}</p>
        </div>
    )
}
