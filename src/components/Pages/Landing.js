import "../../app/globals.css";

export default function Landing() {
  return (
    <>
      <section className="scroll-smooth" id='intro'>
        <div className='hero flex-row relative flex items-center justify-center h-screen overflow-hidden'>
          <div className='absolute top-0 left-0 h-full w-full'>
            <video
              autoPlay
              muted
              loop>
              <source
                src='/bg-1.mp4'
                type='video/mp4'
              />
            </video>
          </div>
          <h1 className='text-banner leading-tight tracking-tight	text-center mt-10 font-extrabold font-space z-30 text-white bg-opacity-50 rounded-xl'>
            Volunteer now <br></br> for a good cause.<br></br>
            <p className='block text-2xl text-center leading-tight tracking-tight mt-10 font-space font-light z-30 text-white bg-opacity-50'>
              To save the world , one step at a time.
            </p>
          </h1>
        </div>
      </section>

    </>
  );
}
