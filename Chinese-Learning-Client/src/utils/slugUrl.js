import slugify from "slugify"

const slugUrl = (str) => {
    if (!str) return
    return slugify(str, {
        lower: true,
        locale: 'vi',
        remove: /[*+~.()'"!:@]/g,
        strict: true,
    })
}
export default slugUrl;