<template>
  <section class="login">
    <ValidationObserver ref="observer" v-slot="{ invalid, reset }">
      <form ref="form" @submit.prevent="onSubmit" @reset.prevent="reset">
        <div class="card card-wrapper">
          <div class="title">Authentication</div>
          <ValidationProvider rules="required|email" v-slot="{ errors }" class="field">
            <b-field label="Email">
              <b-input placeholder="Email" icon="email" size="is-medium" v-model="email"></b-input>
            </b-field>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider rules="required|minmax:6,10" v-slot="{ errors }" class="field">
            <b-field label="Password">
              <b-input
                size="is-medium"
                icon="key"
                type="password"
                password-reveal
                v-model="password"
                maxlength="10"
              ></b-input>
            </b-field>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
          <div class="buttons">
            <b-button
              type="is-primary"
              class="sabmit"
              :disabled="invalid"
              :loading="getLoading"
              @click="onSubmit"
            >OK</b-button>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </section>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { ValidationProvider } from "vee-validate";
import { extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
import { mapGetters } from "vuex";
extend("minmax", {
  validate(password, { min, max }) {
    return password.length >= min && password.length <= max;
  },
  params: ["min", "max"],
  message:
    "The field must have at least {min} characters and {max} characters at most"
});

extend("email", {
  ...email,
  message: "email address is invalid"
});
extend("required", {
  ...required,
  message: "The field is required"
});
export default {
  name: "Login",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    password: "",
    email: ""
  }),
  computed: {
    ...mapGetters(["getLoading"])
  },
  methods: {
    onSubmit() {
      let user = {
        email: this.email,
        password: this.password,
        returnSecureToken: true
      };
      this.$store.dispatch("loginuser", user);
      this.resetForm();
    },
    resetForm() {
      this.email = "";
      this.password = "";
      this.$refs.observer.reset();
    }
  }
};
</script>

<style lang="scss" scoped>
.card-wrapper {
  padding-top: 50%;
  max-width: 500px;
  padding: 5rem;
  margin: 0 auto;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.02);
  border-radius: 5px;

  .field {
    position: relative;
    margin-bottom: 2rem;
    .password-inp {
      width: 100% !important;
    }
  }
  .error {
    color: red;
    font-size: 0.8rem;
    position: absolute;
    width: 300px;
    top: 5rem;
  }
  .sabmit {
    width: 80px;
  }
  .password {
    position: relative;
    width: 100%;
    .icon {
      position: absolute;
      right: 10px;
      top: 5px;
      z-index: 2;
    }
  }
}
</style>
