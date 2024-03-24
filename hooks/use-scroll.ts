const useScroll = () => {
  const scrollTo = (id: string) => {
    if (!id) {
      // scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  return { scrollTo };
};

export default useScroll;
