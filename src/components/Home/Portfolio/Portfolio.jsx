'use client'
import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'

const Portfolio = () => {
  const portfolioItems = [
    {
      id: 2,
      title: "Mobile App UI",
      description: "Fitness tracking application with custom illustrations and smooth animations.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      tags: ["Figma", "UI Design", "Prototyping"]
    },
    {
      id: 3,
      title: "Brand Identity",
      description: "Complete visual identity including logo, business cards, and brand guidelines.",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      tags: ["Logo Design", "Branding", "Print"]
    },
    {
      id: 4,
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with payment integration and admin dashboard.",
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      tags: ["Next.js", "Node.js", "MongoDB"]
    }
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [items, setItems] = useState([...portfolioItems])
  const mainImageRef = useRef(null)
  const thumbnailRefs = useRef([])
  const contentRef = useRef(null)

  useEffect(() => {
    thumbnailRefs.current = thumbnailRefs.current.slice(0, portfolioItems.length)
  }, [portfolioItems])

  const handleThumbnailClick = (index) => {
    if (index === activeIndex) return

    const newIndex = index
    const direction = newIndex > activeIndex ? 1 : -1

    // Get DOM elements
    const oldMainImage = mainImageRef.current
    const clickedThumbnail = thumbnailRefs.current[newIndex]
    const content = contentRef.current

    // Clone the clicked thumbnail for animation
    const clone = clickedThumbnail.cloneNode(true)
    clone.style.position = 'absolute'
    clone.style.width = '200px'
    clone.style.height = '120px'
    clone.style.top = `${clickedThumbnail.getBoundingClientRect().top}px`
    clone.style.left = `${clickedThumbnail.getBoundingClientRect().left}px`
    document.body.appendChild(clone)

    // Hide the original thumbnail during animation
    clickedThumbnail.style.visibility = 'hidden'

    // Get positions
    const mainImageRect = oldMainImage.getBoundingClientRect()
    const thumbnailRect = clickedThumbnail.getBoundingClientRect()

    // Animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIndex(newIndex)
        document.body.removeChild(clone)
        clickedThumbnail.style.visibility = 'visible'
      }
    })

    // Animate the clicked thumbnail to main image position
    tl.to(clone, {
      x: mainImageRect.left - thumbnailRect.left,
      y: mainImageRect.top - thumbnailRect.top,
      width: mainImageRect.width,
      height: mainImageRect.height,
      duration: 0.8,
      ease: "power3.inOut"
    })

    // Animate the old main image out to the left
    tl.to(oldMainImage, {
      x: -window.innerWidth,
      opacity: 0,
      duration: 0.6,
      ease: "power3.in"
    }, 0)

    // Fade in new content
    tl.fromTo(content, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      0.4
    )

    // Reset position and opacity for next animation
    tl.set(oldMainImage, { x: 0, opacity: 1 }, "+=0.1")
  }

  return (
    <section className="py-16 bg-black text-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Featured Work
          </span>
        </h2>
        
        <div className="flex flex-col lg:flex-row items-start gap-12 mb-8">
          {/* Left Side - Main Image */}
          <div className="w-full lg:w-1/2 relative overflow-hidden rounded-2xl shadow-2xl">
            <img 
              ref={mainImageRef}
              src={items[activeIndex].image} 
              alt={items[activeIndex].title}
              className="w-full h-auto object-cover rounded-2xl"
            />
          </div>
          
          {/* Right Side - Content */}
          <div ref={contentRef} className="w-full lg:w-1/2">
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-6 text-white">
                {items[activeIndex].title}
              </h2>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                {items[activeIndex].description}
              </p>
              <div className="flex flex-wrap">
                {items[activeIndex].tags.map((tag, index) => (
                  <span key={index} className="inline-block bg-gray-800 rounded-full px-3 py-1 text-sm font-medium text-gray-200 mr-2 mb-2">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Thumbnail Gallery - Below content */}
            <div className="mt-40 relative h-50 px-4">
              <div className="flex justify-start gap-4 pb-4">
                {items.map((item, index) => (
                  <div 
                    key={item.id}
                    ref={el => thumbnailRefs.current[index] = el}
                    onClick={() => handleThumbnailClick(index)}
                    className={`cursor-pointer rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:brightness-110 flex-shrink-0 ${
                      index === activeIndex ? 'ring-2 ring-pink-500 brightness-110' : 'brightness-80'
                    }`}
                    style={{ width: '200px', height: '120px' }}
                  >
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Portfolio