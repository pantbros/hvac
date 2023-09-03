document.addEventListener("DOMContentLoaded", function() {
    // You can change this class to specify which elements are going to behave as counters.
    var elements = document.querySelectorAll(".scroll-counter")

    elements.forEach(function(start) {
        // Add new attributes to the elements with the '.scroll-counter' HTML class
        start.counterAlreadyFired = false
        start.counterSpeed = start.getAttribute("biz-tim") / 45
        start.counterTarget = +start.innerText
        start.counterCount = 0
        start.counterStep = start.counterTarget / start.counterSpeed

        start.updateCounter = function() {
        start.counterCount = start.counterCount + start.counterStep
        start.innerText = Math.ceil(start.counterCount)

        if (start.counterCount < start.counterTarget) {
            setTimeout(start.updateCounter, start.counterSpeed)
        } else {
            start.innerText = start.counterTarget
        }
        }
    })

    // Function to determine if an element is visible in the web page
    var isElementVisible = function isElementVisible(el) {
        var scroll = window.scrollY || window.pageYOffset
        var boundsTop = el.getBoundingClientRect().top + scroll
        var viewport = {
        top: scroll,
        bottom: scroll + window.innerHeight,
        }
        var bounds = {
        top: boundsTop,
        bottom: boundsTop + el.clientHeight,
        }
        return (
        (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom) ||
        (bounds.top <= viewport.bottom && bounds.top >= viewport.top)
        )
    }

    // Funciton that will get fired uppon scrolling
    var handleScroll = function handleScroll() {
        elements.forEach(function(start, id) {
        if (true === start.counterAlreadyFired) return
        if (!isElementVisible(start)) return
        start.updateCounter()
        start.counterAlreadyFired = true
        })
    }

    // Fire the function on scroll
    window.addEventListener("scroll", handleScroll)
    })