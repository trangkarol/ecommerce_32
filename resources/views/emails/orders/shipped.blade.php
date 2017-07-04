@component('mail::message')
# {{ trans('setting.order.title') }}

@component('mail::table')
|                                        |                           |                                      |                                          |
|:---------------------------------------|:------------------------- |:------------------------------------ |:---------------------------------------- |
| {{ trans('setting.order.user_name') }} | {!! $content['name'] !!}  |                                      |                                          |
| {{ trans('setting.order.email') }}     | {!! $content['email'] !!} | {{ trans('setting.order.address') }} | {!! $content['address'] !!}              |
| {{ trans('setting.order.phone') }}     | {!! $content['phone'] !!} | {{ trans('setting.order.total') }}   | {!! number_format($content['price']) !!} |
@endcomponent

@component('mail::table')
| {{ trans('setting.order.product_name') }} | {{ trans('setting.order.price') }}    | {{ trans('setting.order.quantity') }} | {{ trans('setting.order.value') }}                        |
| ----------------------------------------- | -------------------------------------:| -------------------------------------:| ---------------------------------------------------------:|
@foreach($content['order_items'] as $item)
| {!! $item['name'] !!}                     | {!! number_format($item['price']) !!} | {!! $item['quantity'] !!}             | {!! number_format($item['price'] * $item['quantity']) !!} |
@endforeach
@endcomponent

{{ trans('setting.order.thanks') }}<br>
{!! $content['name'] !!}
@endcomponent
