'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Nav = () => {
  const isUserLogin = true;
  const [provider, setProvider] = useState(null);
  const [toggle, setToggle] = useState(false)

  useEffect(() =>{
    const setProvider = async () => {
      const response = await getProviders();

      setProvider(response);
    }
  }, []) 
  return (
    <div>
      <nav className='w-full flex items-center justify-between mb-16 pt-3'>
        <Link href='/' className='flex gap-2 items-center'>
        <Image 
        src="/assets/images/logo.jpg" alt='nextlogo' width={50} height={50}/>
        <p>NextJs</p>
        </Link>
        <div className='sm:flex hidden'>
          {isUserLogin ? (
            <div className='flex gap-3 md:gap-5'>
              <Link href='/create-prompt' className='black_btn'>
                Create Post
              </Link>
              <button onClick={signOut} type='signOut' className='outline_btn'>
                signOut
              </button>
              <Link href='/profile'>
                <Image src='/assets/images/webdeveloper.png' 
                alt='profile' 
                width={37}
                height={37} className='rounded-full border-2 border-black'/>
              </Link>
            </div>
          ):(
            <>
            {
              provider && Object.values(provider).map((provider)=>{
                <button 
                type='button'
                key={provider.name}
                onClick={()=>signIn(provider.id)}
                className='black-btn'
                >
                  Sign In
                </button>
              })
            }
            </>
          )}
        </div>
        <div className='sm:hidden flex relative'>
          {isUserLogin ? (
            <div className='flex'>
              <Image src='/assets/images/webdeveloper.png' 
                alt='profile' 
                width={37}
                height={37}
                onClick={() => setToggle ((prev)=> !prev)}
                className='rounded-full border-2 border-black'/>
            </div>
          ) :(
            <>
            {
              toggle && (
                <div className='dropdown'>
                  <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={()=> setToggle(false)}
                  >
                  My Profile
                  </Link>
                </div>
              )
            }
            {
              provider && Object.values(provider).map((provider)=>{
                <button 
                type='button'
                key={provider.name}
                onClick={()=>signIn(provider.id)}
                className='black-btn'
                >
                  Sign In
                </button>
              })
            }
            </>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Nav
