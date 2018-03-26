import request from 'superagent'
import {
	Message,
	MessageBox
} from 'element-ui'
import Store from '@/store'
export default obj => {
	Store.state.loading.loading = true;
	request
		.post('/'+obj.url)
		.set('Content-type','application/x-www-form-urlencoded')
		.send(obj.data)
		.then(function (res) {
			if (~res.body.code) {
				Store.state.loading.loading = false;
				obj.success && obj.success(res.body)
			}
		});
}
