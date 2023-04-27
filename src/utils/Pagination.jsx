
class PagingContext {
    constructor(props){
        this.state = {
            currentPage: props.currentPage,
            skip: props.skip,
            take: props.take
          };
    }
}