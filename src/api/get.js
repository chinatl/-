import request from 'superagent'
import {
	Message,
	MessageBox
} from 'element-ui'
import Store from '@/store'
export default obj => {
	Store.state.loading.loading = true;
	request
		.get('/'+obj.url)
		.query(obj.data)
		.then(function (res) {
			if (~res.body.code) {
				Store.state.loading.loading = false;
				obj.success && obj.success(res.body)
			}
		});
}
