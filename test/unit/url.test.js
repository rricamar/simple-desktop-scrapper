const UrlHelper = require("../../src/url")
let urlHelper

beforeEach(() => {
    urlHelper = new UrlHelper()
})

test("should create", () => {
    expect(urlHelper).toBeDefined()
})

test("should return the url of the image at full resolution (PNG)", () => {
    const url = "http://static.simpledesktops.com/uploads/desktops/2020/05/06/sphericalharmonics1.png.295x184_q100.png"
    const fullResUrl = "http://static.simpledesktops.com/uploads/desktops/2020/05/06/sphericalharmonics1.png"
    const result = urlHelper.getFullResImageUrl(url)
    expect(result.fullSizeUrlWithExtension).toBe(fullResUrl)
})

test("should return the url of the image at full resolution (JPEG)", () => {
    const url = "http://static.simpledesktops.com/uploads/desktops/2020/03/30/piano.jpg.295x184_q100.png"
    const fullResUrl = "http://static.simpledesktops.com/uploads/desktops/2020/03/30/piano.jpg"
    const result = urlHelper.getFullResImageUrl(url)
    expect(result.fullSizeUrlWithExtension).toBe(fullResUrl)
})
