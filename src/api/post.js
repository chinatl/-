import request from 'superagent'
import {
	Message,
	MessageBox
} from 'element-ui'
import Store from '@/store'
export default obj => {
	Store.state.loading.loading = true;
	request
		.post('/' + obj.url)
		.set('Content-type', 'application/x-www-form-urlencoded')
		.send(obj.data)
		.then(res => {
			if (res.body.code === 0) {
				Store.state.loading.loading = false;
				obj.success && obj.success(res.body)
			} else {
				Store.state.loading.loading = false;
				Message.error(res.body.data);
				obj.fail && obj.fail(res.body)
			}
		}).catch(res => {
			console.log(res)
			Message.error('网页延迟');
			Store.state.loading.loading = false;
		})
}
