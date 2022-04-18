
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ErrorMessage } from "@hookform/error-message";
import { useContactus } from "../hooks/Web2/mutations/useContactusMutation";
import toast from 'react-hot-toast';

const Contactvalidation = yup.object().shape({
  name: yup.string().required(),
  subject: yup.string().required(),
  email: yup.string().email('Invalid email format').required(),
});
const Contact = () => {
  const { mutate: createContactus } = useContactus()
  const { register, handleSubmit, reset, formState: { errors }, } = useForm({
    resolver: yupResolver(Contactvalidation)
  });

  const onSubmit = async (data) => {
    // alert(JSON.stringify(data));
    await createContactus(data, {
      onSuccess: async (res) => {
        toast.success("We will contact you soon.")
        reset();
      }
    })
  };

  return (
    <>
      <section class="contact">
        <img class="left-img" src="../images/contact-left.png" alt="" />
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8 col-md-10">
              <div class="section-heading">
                <h5 class="subtitle">
                  Contact Us
                </h5>
                <h2 class="title">
                  Get in Touch
                </h2>
                <p class="text">
                  If you have any query then feel free to reach out to us.
                  <br />
                  Our team we get back you within 24hr.
                </p>
              </div>
            </div>
          </div>
          <div class="row justify-content-end">
            <div class="col-lg-6">
              <div class="contact-form-wrapper">
                <div class="contact-box">
                  <h4 class="title">
                    Send Us a Message
                  </h4>


                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-group'>
                      <label style={{ color: 'white' }}>Name</label>
                      <input
                        type='text'
                        {...register("name")}
                        name="name"
                        className='form-control'
                        placeholder='e. g. “mic-wilson”'
                      />
                      <ErrorMessage
                        errors={errors}
                        name="name"
                        render={({ message }) => <p style={{ color: "#f14D5D", padding: 10 }}>{message}</p>}
                      />
                    </div>


                    <div className='form-group'>
                      <label style={{ color: 'white' }}>subject</label>
                      <input
                        type='text'
                        {...register("subject")}
                        name="subject"
                        className='form-control'
                        placeholder='e. g. “work related'
                      />
                      <ErrorMessage
                        errors={errors}
                        name="subject"
                        render={({ message }) => <p style={{ color: "#f14D5D", padding: 10 }}>{message}</p>}
                      />
                    </div>


                    <div className='form-group'>
                      <label style={{ color: 'white' }}>email</label>
                      <input
                        type='email'
                        {...register("email")}
                        name="email"
                        className='form-control'
                        placeholder='e. g. “xyz@gmail.com”'
                      />
                      <ErrorMessage
                        errors={errors}
                        name="email"
                        render={({ message }) => <p style={{ color: "#f14D5D", padding: 10 }}>{message}</p>}
                      />
                    </div>



                    <div className='form-group'>
                      <label style={{ color: 'white' }}>description</label>
                      <input
                        type='text'
                        {...register("description")}
                        name="description"
                        className='form-control'
                        placeholder='e. g. “ i want to know .....”'
                      />
                      <ErrorMessage
                        errors={errors}
                        name="description"
                        render={({ message }) => <p style={{ color: "#f14D5D", padding: 10 }}>{message}</p>}
                      />
                    </div>

                    <div className='col-lg-12 col-md-12 text-center'>
                      <button
                        className='default-btn border-radius-5'
                      >
                        Contact us
                      </button>
                    </div>

                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
