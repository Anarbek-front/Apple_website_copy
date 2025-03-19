import React from 'react'
import { footerLinks } from '../../constants'

export const Footer = () => {
    return (
        <footer className="py-5 sm:px-10 px-5">
            <div className="screen-max-width">
                <div>
                    <p>
                        More ways to shop:
                        <span className="underline text-blue">
                            {''}Find an Apple Store {''}
                        </span>
                        or
                        <span className="underline text-blue">
                            other ratailer
                        </span>
                        hear you.
                    </p>
                    <p className="font-semibold text-gray text-xs">
                        Or call 0002322-2323-22
                    </p>
                </div>
                <div className="w-full h-[1px] bg-neutral-600 my-5" />
                <div className="flex md:flex-row flex-col md:items-center justify-between">
                    <p className="font-semibold text-gray text-xs">
                        Copright @ 2024 Apple Inc. All rights reserved.
                    </p>
                    <div className="flex">
                        {footerLinks.map((link, idx) => (
                            <p
                                key={link}
                                className="font-semibold text-gray text-xs"
                            >
                                {link}
                                {idx !== footerLinks.length - 1 && (
                                    <span className="sm:mx-2 mx-0.4"> | </span>
                                )}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
