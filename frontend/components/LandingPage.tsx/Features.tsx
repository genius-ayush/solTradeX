import React from 'react'

function Features() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-t from-[#0a0a0a] via-[#141414] to-[#161616]">
      {/* Glassy background overlay */}
      {/* <div className="absolute inset-0 bg-black/40 backdrop-blur-lg"></div> */}

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-5xl font-bold mb-4">Welcome to BonkBot</h1>
        <p className="text-lg mb-6">Trade easily with Solana on autopilot</p>
        <button className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20">
          Get Started
        </button>
      </div>
    </section>)
}

export default Features