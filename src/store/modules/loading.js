const app = {
	state: {
		loading: false
	},
	mutations: {
		cloas_loading: state => {
			state.loading = false
		},
		open_loading: state => {
			state.loading = true
		}

	}
}

export default app
