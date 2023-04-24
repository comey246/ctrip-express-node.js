
class createOrder {
    static  createid(){
        try{
            const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
            let result = '';
            for (let i = 0; i < 6; i++) {
                result += chars[Math.floor(Math.random() * chars.length)];
            }
            return result;
        }catch (err){
            console.error('Failed to generate id:', err);
        }
    }
    static  createTime(){
        try{
                const date = new Date();
                const year = date.getFullYear().toString();
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const day = date.getDate().toString().padStart(2, '0');
                const hour = date.getHours().toString().padStart(2, '0');
                const minute = date.getMinutes().toString().padStart(2, '0');
                const second = date.getSeconds().toString().padStart(2, '0');
                return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
        } catch (err){
            console.error('Failed to gen time:', err);
        }
    }
}

module.exports = createOrder