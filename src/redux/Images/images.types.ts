export interface Category{
    category_name : string;
    category_verdict : string;
    category_image : string;
}

export interface Album {
    album_name : string;
}

export interface Images {
    id : string;
    image_name : string;
    verdict : string;
    reason_for_rejection : string;
    public_url: string;
    private_url : string;
    album : Album;
    categories : Array<Category>
}


export interface ImageResponse {
    success: boolean;
    message: string;
    data : Array<Images>
}

export interface ImageState {
    loading :boolean;
    success: boolean;
    message: string;
    stock : Array<Images>
}

export interface ImageAction{
    type : string;
    payload : ImageState
}