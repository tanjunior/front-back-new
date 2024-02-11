import ContactForm from '../components/ContactForm'

export default function AboutPage() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='flex items-center justify-center p-1 rounded-lg shadow-2xl h-fit'>
        <div className='p-12 rounded-lg flex flex-col min-w-[491px] min-h-[647px] bg-[url("/about.png")] bg-contain bg-no-repeat justify-between'>
          <div className='gap-2'>
            <h1 className='text-4xl font-medium text-white'>asdasda</h1>
            <div className='font-medium text-[#C9C9C9]'>say something</div>
          </div>
          <div className='grid items-center justify-center grid-cols-2 gap-12 w-min'>
              <img src="./phone.svg" alt="" className='min-w-5'/>
              <div className='text-white'>safasfsdf</div>
              <img src="./mail.svg" alt="" className='min-w-5' />
              <div className='text-white'>safasfsdf</div>
              <img src="./pin.svg" alt="" className='min-w-5' />
              <div className='text-white'>safasfsdf</div>
          </div>
          <div className='flex items-start justify-around'>
            <img src="/facebook.svg" alt="" />
            <img src="/instagram.svg" alt="" />
            <img src="/youtube.svg" alt="" />
            <img src="/twitter.svg" alt="" />
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  )
}
