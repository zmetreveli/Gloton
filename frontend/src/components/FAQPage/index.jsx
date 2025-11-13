import React from "react";
import styles from "./styles.module.css";
import { motion } from "framer-motion";

export default function FAQPage() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, translateY: -50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ ease: "easeOut", duration: 0.3 }}
        class={styles.faqContainer}
      >
        <header className={styles.header}>
          <h1>Preguntas frecuentes</h1>
        </header>

        <div className={styles.faqsContainer}>
          <div class={styles.faq}>
            <p class={styles.faqQuestion}>
              ¿Cómo puedo hacer un pedido en Gloton?
            </p>
            <p class={styles.faqAnswer}>
              Simplemente busca el restaurante o tienda de tu elección, agrega
              los productos a tu carrito y sigue el proceso de checkout para
              completar tu pedido.
            </p>
          </div>
          <div class={styles.faq}>
            <p class={styles.faqQuestion}>
              ¿Cuánto tiempo tarda en llegar mi pedido?
            </p>
            <p class={styles.faqAnswer}>
              El tiempo de entrega varía según la distancia y el tiempo de
              preparación del establecimiento. Generalmente, intentamos que tu
              pedido llegue en menos de 60 minutos.
            </p>
          </div>
          <div class={styles.faq}>
            <p class={styles.faqQuestion}>¿Cómo puedo pagar mi pedido?</p>
            <p class={styles.faqAnswer}>
              Aceptamos varios métodos de pago, incluyendo tarjetas de
              crédito/débito, PayPal, y pago en efectivo al momento de la
              entrega.
            </p>
          </div>
          <div class={styles.faq}>
            <p class={styles.faqQuestion}>
              ¿Qué hago si mi pedido llega incompleto o en mal estado?
            </p>
            <p class={styles.faqAnswer}>
              En caso de cualquier problema con tu pedido, puedes contactarnos a
              través de nuestra sección de ayuda en la app o la web y
              resolveremos tu situación lo antes posible.
            </p>
          </div>
          <div class={styles.faq}>
            <p class={styles.faqQuestion}>
              ¿Puedo cancelar o modificar mi pedido?
            </p>
            <p class={styles.faqAnswer}>
              Puedes cancelar o modificar tu pedido dentro de los primeros 5
              minutos después de haberlo realizado. Después de este tiempo, el
              pedido ya habrá sido procesado por el restaurante.
            </p>
          </div>
          <div class={styles.faq}>
            <p class={styles.faqQuestion}>
              ¿Cómo puedo crear una cuenta en Gloton?
            </p>
            <p class={styles.faqAnswer}>
              Puedes crear una cuenta en Gloton utilizando tu dirección de
              correo electrónico o mediante tu cuenta de Facebook o Google para
              un proceso más rápido.
            </p>
          </div>
          <div class={styles.faq}>
            <p class={styles.faqQuestion}>
              ¿Cómo puedo seguir el estado de mi pedido?
            </p>
            <p class={styles.faqAnswer}>
              Una vez que tu pedido ha sido confirmado, puedes seguir su estado
              en tiempo real a través de nuestra aplicación o sitio web en la
              sección "Mis pedidos".
            </p>
          </div>
          <div class={styles.faq}>
            <p class={styles.faqQuestion}>
              ¿Gloton ofrece promociones o descuentos?
            </p>
            <p class={styles.faqAnswer}>
              Sí, Gloton ofrece promociones y descuentos regularmente. Te
              recomendamos suscribirte a nuestro boletín y seguirnos en redes
              sociales para estar al tanto de las últimas ofertas.
            </p>
          </div>
          <div class={styles.faq}>
            <p class={styles.faqQuestion}>
              ¿Qué debo hacer si tengo un problema con mi cuenta?
            </p>
            <p class={styles.faqAnswer}>
              Si encuentras algún problema con tu cuenta, por favor contacta a
              nuestro servicio de soporte al cliente a través de la sección de
              ayuda en nuestra app o sitio web, y estaremos encantados de
              asistirte.
            </p>
          </div>
          <div class={styles.faq}>
            <p class={styles.faqQuestion}>
              ¿Es posible pedir de varios restaurantes en el mismo pedido?
            </p>
            <p class={styles.faqAnswer}>
              Actualmente, cada pedido debe realizarse por separado para cada
              restaurante. Esto garantiza que tus alimentos lleguen lo más
              frescos posible y en el menor tiempo.
            </p>
          </div>
          <div class={styles.faq}>
            <p class={styles.faqQuestion}>
              ¿Cómo puedo contactar a Gloton si tengo sugerencias o comentarios?
            </p>
            <p class={styles.faqAnswer}>
              Valoramos mucho tus comentarios. Puedes contactarnos directamente
              a través de nuestra sección de contacto en la aplicación o sitio
              web, o mediante nuestras redes sociales.
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
