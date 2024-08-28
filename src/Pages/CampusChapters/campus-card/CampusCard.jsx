import React from 'react'
export const Content = ({ title, children, className }) => {
    return (
        <div className={`flex flex-col gap-1 justify-center items-start ${className}`}>
            <h3 className="text-xs font-bold ">{title}</h3>
            <p className="text-sm font-light">{children}</p>
        </div>
    )
}
export const CampusName = ({ children }) => {
    return (
        <div className="relative mb-4 group">
            <p className='truncate text-sm md:text-lg font-bold leading-tight text-muorange text-ellipsis'>{children}</p>
            <p className='hidden  bg-white p-5 shadow-sm rounded-xl group-hover:block absolute top-0 left-0 right-0 w-full text-sm md:text-lg font-bold leading-tight text-muorange'>
                {children}
            </p>
        </div>
    )
}
export const CampusCard = ({ data }) => {

    return (
        <div className="w-full sm:max-w-[47.2%] lg:max-w-[31.66796%] p-5   rounded-xl shadow-[0_0_5px_2px_rgba(0,0,0,0.05)]">
            <CampusName>{data.name}</CampusName>
            <div className="flex flex-col gap-4 ">
                <div className="grid grid-cols-4">
                    <Content title={'Zone'} >{data.zone}</Content>
                    <Content title={'District'}  >{data.district}</Content>
                </div>
                <Content title={'Campus Lead'} >{data.lead}</Content>
                <Content title={'Email Address'}  >
                    <a href={`mailto:${data.email}`} className='flex gap-[1px] font-thin justify-center items-center'>
                        <MailSvg />
                        {data.email}
                    </a>
                </Content>
            </div>
        </div>
    )
}
export const MailSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            width="24" height="24"
            viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
            class="lucide lucide-mail h-4 w-4 text-muted-foreground"
            data-id="18"
        >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    )
}

export const PopUp = () => {
    return (
        <div>PopUp</div>
    )
}