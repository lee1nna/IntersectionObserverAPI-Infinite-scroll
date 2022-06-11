const makeSkeleton = () => {
    const skeleton = document.createElement('li')
    const skeletonImg = document.createElement('div')
    const skeletonText = document.createElement('p')
    skeleton.classList.add('skeleton')
    skeletonImg.classList.add('skeleton_img')
    skeletonText.classList.add('skeleton_text')
    skeletonText.textContent = ''
    skeleton.appendChild(skeletonImg)
    skeleton.appendChild(skeletonText)
    return skeleton
}

const cards = document.querySelector('.cards')
const cardItems = document.querySelectorAll('.card')
const skeletonItems = Array.from({length: cardItems.length}, () =>
    makeSkeleton()
)

const addSkeleton = () => {
    skeletonItems.forEach((item) => {
        cards.appendChild(item)
    })
}

const removeSkeleton = () => {
    skeletonItems.forEach((item) => {
        cards.removeChild(item)
    })
}

const loadingStart = () => {
    addSkeleton()
}

const loadingFinish = () => {
    removeSkeleton()
}

const addNewCardItem = () => {
    cardItems.forEach((item) => cards.appendChild(item.cloneNode(true)))
}


const callback = (entries, observer) => {
    entries.forEach((entry) => {
        // 교차 관찰자의 루트와 교차하는 경우 -> entry.isIntersecting === true
        if (entry.isIntersecting) {
            // 관찰 타겟 관찰 중지
            observer.unobserve(entry.target)
            // 로딩 시작
            loadingStart()
            setTimeout(() => {
                // 콘텐츠 추가
                addNewCardItem()
                loadingFinish()
                observeLastItem(observer, document.querySelectorAll('.card'))
            }, 2000)
        }
    })
}

// 마지막 아이템을 관찰하도록 하는 함수
const observeLastItem = (observer, items) => {
    const lastItem = items[items.length - 1]
    observer.observe(lastItem)
}

const observer = new IntersectionObserver(callback, {threshold: 0.7})
observeLastItem(observer, cardItems)