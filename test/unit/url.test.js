const UrlHelper = require("../../src/url")
let urlHelper

beforeEach(() => {
    urlHelper = new UrlHelper()
})

test("should create", () => {
    expect(urlHelper).toBeDefined()
})

test("should return the url of the image at full resolution", () => {
    const url = "http://static.simpledesktops.com/uploads/desktops/2019/06/22/Dinosaur_eye_2.png.295x184_q100.png"
    const fullResUrl = "http://static.simpledesktops.com/uploads/desktops/2019/06/22/Dinosaur_eye_2.png"
    const result = urlHelper.getFullResImageUrl(url)
    expect(result).toBe(fullResUrl)
})