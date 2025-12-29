import React from 'react';

function Summary() {
  const duration=localStorage.getItem('duration');
  return (<>
    <section class="bg-white dark:bg-white">
      <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-black md:text-5xl lg:text-6xl dark:text-black">Thankyou, for your order!</h1>
        <p class="mb-8 text-lg font-normal text-black lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">The Estimated Time of Arrival of your order is: {Math.ceil(duration/60 + 10)} minutes </p>
      </div>
    </section>
  </>
  );
}

export default Summary;
