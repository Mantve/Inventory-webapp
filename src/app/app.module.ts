import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RoomViewComponent } from './room-view/room-view.component';
import { ToastrModule } from 'ngx-toastr';
import { RoomCreateComponent } from './room-create/room-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeModule } from '@circlon/angular-tree-component';
import { ItemViewComponent } from './item-view/item-view.component';
import { RoomEditComponent } from './room-edit/room-edit.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { FriendRequestSendComponent } from './friend-request-send/friend-request-send.component';
import { FriendRequestListComponent } from './friend-request-list/friend-request-list.component';
import { ListListComponent } from './list-list/list-list.component';
import { ListViewComponent } from './list-view/list-view.component';
import { DeletionConfirmationModalComponent } from './deletion-confirmation-modal/deletion-confirmation-modal.component';
import { ListCreateComponent } from './list-create/list-create.component';
import { ListEditComponent } from './list-edit/list-edit.component';
import { ListItemCreateComponent } from './list-item-create/list-item-create.component';
import { ReminderListComponent } from './reminder-list/reminder-list.component';
import { ReminderCreateComponent } from './reminder-create/reminder-create.component';
import { ReminderEditComponent } from './reminder-edit/reminder-edit.component';
import { ItemListComponent } from './item-list/item-list.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'lists', component: ListListComponent },
  { path: 'reminders', component: ReminderListComponent },
  { path: 'list/:listNo', component: ListViewComponent },
  { path: 'friends', component: FriendsListComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'room/:roomNo', component: RoomViewComponent },
  { path: 'item/:itemNo', component: ItemViewComponent },
  { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: '404', component: NotFoundComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    NotFoundComponent,
    RoomViewComponent,
    RoomCreateComponent,
    ItemViewComponent,
    RoomEditComponent,
    ItemEditComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
    CategoryListComponent,
    NavbarComponent,
    FriendsListComponent,
    FriendRequestSendComponent,
    FriendRequestListComponent,
    ListListComponent,
    ListViewComponent,
    DeletionConfirmationModalComponent,
    ListCreateComponent,
    ListEditComponent,
    ListItemCreateComponent,
    ReminderListComponent,
    ReminderCreateComponent,
    ReminderEditComponent,
    ItemListComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    [RouterModule.forRoot(routes)],
    NgbModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    }),
    [TreeModule]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
