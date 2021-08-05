import store from "@/store/store"
import { Module, VuexModule } from "vuex-module-decorators"

@Module({dynamic: true, store, name: "DefaultModule"})
export default class DefaultModule extends VuexModule {

}