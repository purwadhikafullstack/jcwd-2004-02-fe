import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css' 
import navbar from '../components/navbar'
import Navbar from '../components/navbar' 
import Footer from '../components/Footer'


export default function Home() {
  return (
    <div>
      <Navbar/> 
      <Footer/>
    </div>
  )
}
